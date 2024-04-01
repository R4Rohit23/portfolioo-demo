const ROUTES = {
  AUTH: {
    SEND_OTP: "/api/auth/send-otp",
    REGISTER_USER: "/api/auth/register",
    REGISTER_CLIENT: "/api/auth/register-client",
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    SENDOTP: "/api/auth/send-otp",
    VERIFYOTP: "/api/auth/verify-otp",
    RESETPASSWORD: "/api/auth/reset-password",
    VALIDATE_USER: "/api/profile/my-profile",
    FORGOT_PASSWORD: "/api/auth/forgot-password-token",
    UPDATE_PASSWORD: "/api/auth/change-password",
    UPDATE_PROFILE: "/api/profile/update-profile",
  },
  ARTIST: {
    ONBOARD_ARTIST: "/api/artist/onboardArtist",
    GET_ALL_ARTISTS: "/api/artist/getAllArtists",
  },
  CLIENT: {
    ONBOARD_CLIENT: "/api/client/onboardClient",
    UPDATE_CLIENT_PROFILE: "/api/client/updateClient",
  },
  DASHBOARD: {
    SUGGEST_LOCATION: "/api/dashboard/suggest-location",
  },
  GIG: {
    CREATE_GIG: "/api/gig/create-gig",
    GET_ALL_GIGS: "/api/gig/getAllGigs",
  },
  MESSAGES: {
    CREATE_MESSAGE: "/api/message/createMessage",
    GET_ALL_MESSAGES: "/api/message/getMessage",
    UPDATE_INVITE: "/api/message/updateInvite"
  },
  ADMIN: {
    LOGIN: "/api/admin/loginAdmin",
    GET_ALL_USERS: "/api/admin/getAllUsers",
    GET_ALL_STATS: "/api/dashBoard/getDashboard"
  },
  PAYMENT: {
    CHECKOUT: "/api/payment/checkout",
    GET_API_KEY: "/api/payment/getKey",
    PAYMENT_VERIFICATION: "/api/payment/paymentVerification"
  }
};

export default ROUTES;
