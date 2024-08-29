"use client";

export default function Custom404() {
    const goBack = () => {
        // navigate to previous page
        window.history.back();
    };

    return (
        <main>
            <section style={{ position: "relative", height: "100%" }}>
                <div style={{ position: "absolute", top: "35%", textAlign: "center" }}>
                    <h1>404 - Page Not Found</h1>
                    <p>
                        The page you are trying to access doesn't exist. You can try going <a href="#" onClick={(e) => { e.preventDefault(); goBack(); }}>back</a> or to the <a href="/">home page</a>.
                    </p>
                </div>
            </section>
        </main>
    );
}
