// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";
// import { env } from "../env";

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });

//   const supabase = createServerClient(env.supabase.url, env.supabase.anonKey, {
//     cookies: {
//       getAll() {
//         return request.cookies.getAll();
//       },
//       setAll(cookiesToSet) {
//         cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
//         supabaseResponse = NextResponse.next({
//           request,
//         });
//         cookiesToSet.forEach(({ name, value, options }) =>
//           supabaseResponse.cookies.set(name, value, options)
//         );
//       },
//     },
//   });

//   // Memvalidasi session
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Proteksi rute admin
//   if (request.nextUrl.pathname.startsWith("/admin")) {
//     // Jika rute admin tetapi tidak ada user, redirect ke halaman login
//     // Kecuali jika sedang berada di /admin/login
//     if (!user && !request.nextUrl.pathname.startsWith("/admin/login")) {
//       const url = request.nextUrl.clone();
//       url.pathname = "/admin/login";
//       return NextResponse.redirect(url);
//     }

//     // Jika sudah logged in dan mencoba ke /admin/login, arahkan ke dashboard
//     if (user && request.nextUrl.pathname.startsWith("/admin/login")) {
//       const url = request.nextUrl.clone();
//       url.pathname = "/admin/dashboard";
//       return NextResponse.redirect(url);
//     }
//   }

//   return supabaseResponse;
// }
