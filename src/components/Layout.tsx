import Header from "./Header";
import Footer from "./Footer";
import type {ReactNode} from "react";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
