import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Fetch all users or implement any desired logic for users
    const users = await prisma.user.findMany();

    // Return a response with all users (example response)
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// removed verifcation for now


// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const token = searchParams.get("token");

//   if (!token) {
//     return NextResponse.json(
//       { error: "Missing verification token" },
//       { status: 400 }
//     );
//   }

//   try {
//     const user = await prisma.user.findU({
//       where: { emailVerificationToken: token },
//     });
    

//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid verification token" },
//         { status: 400 }
//       );
//     }

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         emailVerified: new Date(),
//         emailVerificationToken: null,
//       },
//     });

//     return NextResponse.redirect(new URL("/login?verified=true", request.url));
//   } catch (error) {
//     console.error("Email verification error:", error);
//     return NextResponse.json(
//       { error: "Failed to verify email" },
//       { status: 500 }
//     );
//   }
// }