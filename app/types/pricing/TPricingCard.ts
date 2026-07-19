export type TPricingCard = {
    codename?: string;
    title: string;
    price: number | string;
    list: Array<string>;
    isPopular?: boolean;
}