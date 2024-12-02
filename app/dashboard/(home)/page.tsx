import QuickStartCards from './_components/QuickStartCard';

const HomePage = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="sm:text-3xl text-xl font-bold">Welcome to Your Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Get started quickly with these options or explore your analytics.
                </p>
            </header>

            <QuickStartCards />
        </div>
    );
};

export default HomePage;
