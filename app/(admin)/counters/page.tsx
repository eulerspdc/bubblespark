// pages/counter-list.tsx
import Link from "next/link";

const CounterListPage = () => {
  const counters = [
    { id: 1, name: "Counter 1" },
    { id: 2, name: "Counter 2" },
    { id: 3, name: "Counter 3" },
  ];

  return (
    <div>
      <h1>Your Counters</h1>
      <ul>
        {counters.map((counter) => (
          <li key={counter.id}>
            <Link href={`/campaign/${counter.id}`}>{counter.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CounterListPage;
