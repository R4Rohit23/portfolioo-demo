export interface IArtistCard {
    _id: string;
    userId: string;
    title: string;
    description: string;
    location: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        profileImage?: string;
    };
    skills: string[];
    profileImg: string;
}