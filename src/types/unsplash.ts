export interface UnsplashSearchQueryParams {
    query: string;
    page?: number;
    per_page?: number;
    order_by?: "latest" | "relevant";
    collections?: string;
    content_filter?: "low" | "high";
    color?:
        | "black_and_white"
        | "black"
        | "white"
        | "yellow"
        | "orange"
        | "red"
        | "purple"
        | "magenta"
        | "green"
        | "teal"
        | "blue";
    orientation?: "landscape" | "portrait" | "squarish";
    lang?: string; // ISO 639-1 language code
}

interface UserProfileImage {
    small: string;
    medium: string;
    large: string;
}

interface UserLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
}

interface User {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    instagram_username: string;
    twitter_username: string;
    portfolio_url: string;
    profile_image: UserProfileImage;
    links: UserLinks;
}

interface PhotoUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

interface PhotoLinks {
    self: string;
    html: string;
    download: string;
}

interface Photo {
    id: string;
    created_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string;
    user: User;
    current_user_collections: any[];
    urls: PhotoUrls;
    links: PhotoLinks;
}

export interface UnsplashSearchResponse {
    total: number;
    total_pages: number;
    results: Photo[];
}
export interface UnsplashErrorResponse {
    errors: string[];
}
