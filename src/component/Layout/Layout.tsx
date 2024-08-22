import Navbar from "../Navbar/Navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header />
            <main>{children}</main>
            <footer />
        </>
    );
}
