import { defineMiddleware } from "astro:middleware"
import { PUBLIC_ROUTES, AUTH_ROUTES, ADMIN_ROUTES } from "./settings"
import { getCurrentUser, isCurrentUserAdmin } from "./utils/server/users"

const verifyAuth = async (token) => {
    if (!token) {
        return {
            status: 401,
            data: "Not authenticated",
        }
    }

    try {
        const userVerify = await getCurrentUser(token);
        if (userVerify.status == 200) {
            return {
                status: 200,
                data: "User verified",
            }
        } else {
            return {
                status: userVerify.status,
                data: userVerify.data,
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const onRequest = defineMiddleware(async (context, next) => {
    if (PUBLIC_ROUTES.includes(context.url.pathname)) {
        return next();
    }

    if (AUTH_ROUTES.includes(context.url.pathname)) {
        if (context.cookies.has('user')) {
            return Response.redirect(new URL("/", context.url));
        }

        return next();
    }

    if (context.cookies.has('user')) {
        const token = context.cookies.get('user').value;
        const validation = await verifyAuth(token);

        if(context.url.pathname==='/logout'){
            return next();
        }

        switch (validation.status) {
            case 200:
                if(ADMIN_ROUTES.includes(context.url.pathname)){
                    const isAdmin = await isCurrentUserAdmin(token);
                    if(!isAdmin){
                        return Response.redirect(new URL("/", context.url));
                    }
                }
                return next();
            case 403:
                return Response.redirect(new URL("/logout", context.url));
            default:
                return Response.redirect(new URL("/", context.url));
        }
    }else{
        return Response.redirect(new URL("/", context.url));
    }
});