import Card from "../components/card";
import useAuthStore, { authEnum } from "../components/store/auth";
import styles from "../Home.module.css";
import { Link } from "react-router-dom";

export enum programEnum {
  MUSCLE = "muscle",
  FAL_LOSS = "fatloss",
  MAINTAIN = "maintain",
}

export default function Home() {
  const role = useAuthStore((state) => state.role);
  return (
    <main className={styles.main}>
      <div className="grid gap-16 xl:grid-cols-2 xl:gap-16 xs:grid-col-1 sm:grid-cols-1 sm:gap-16 md:grid-cols-1 md:gap-16 lg:grid-cols-2 lg:gap-16">
        <Link
          to={
            role === authEnum.USER
              ? `/user-input/${programEnum.FAL_LOSS}`
              : "/auth/login"
          }
          style={{ cursor: "pointer" }}
        >
          <Card
            title="Fat Loss"
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUq7MMS-iz1-0S8yDmZojm9ig1jWk5c4Wtgg"
          />
        </Link>
        <Link
          to={
            role === authEnum.USER
              ? `/user-input/${programEnum.MUSCLE}`
              : "/auth/login"
          }
          style={{ cursor: "pointer" }}
        >
          <Card
            title="Muscle Building"
            imageUrl="https://cdn.fitnesspassion.it/image/original/cbum-shoulders.jpg"
          />
        </Link>
        <Link
          to={
            role === authEnum.USER
              ? `/user-input/${programEnum.MAINTAIN}`
              : "/auth/login"
          }
          style={{ cursor: "pointer" }}
        >
          <Card
            title="Maintain"
            imageUrl="https://www.greatestphysiques.com/wp-content/uploads/2017/06/Courtney-King-10.jpg"
          />
        </Link>
      </div>
    </main>
  );
}
