import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import connectDB from "./lib/db"
import User from "./models/User"

// Function to convert image URL to Base64
async function urlToBase64(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    
    // Get content type
    const contentType = response.headers.get("content-type") || "image/jpeg";
    
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Failed to convert image to base64:", error);
    return undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        token.image = user.image as string | undefined;
        token.name = user.name as string | undefined;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        
        // Convert Google image URL to Base64
        let base64Image: string | undefined;
        if (user.image) {
          base64Image = await urlToBase64(user.image);
        }
        
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: base64Image || user.image, // Fallback to URL if conversion fails
          });
        } else {
          // Update existing user with latest profile info from Google
          await User.findOneAndUpdate(
            { email: user.email },
            {
              name: user.name,
              image: base64Image || user.image, // Fallback to URL if conversion fails
            },
            { new: true }
          );
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user?.email) {
        // First try to get from JWT token
        const tokenImage = token.image as string | undefined;
        const tokenName = token.name as string | undefined;
        
        if (tokenImage) {
          session.user.image = tokenImage;
        }
        if (tokenName) {
          session.user.name = tokenName;
        }

        // Then fallback to database if not in token
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        
        if (dbUser) {
          session.user.name = session.user.name || dbUser.name || session.user.name;
          session.user.image = session.user.image || dbUser.image || session.user.image;
        }
      }
      return session;
    },
  },
})
