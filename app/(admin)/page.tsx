// pages/index.tsx
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Counter App!</h1>
      <p>Create and manage counters for your campaigns easily.</p>
      <Link href="/dashboard">Get Started</Link>
    </div>
  );
};

export default LandingPage;
