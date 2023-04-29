import { useEffect, useState } from "react";
import useThemeStore from "./store/theme";

interface cardPropType {
  title: string;
  imageUrl: string;
}

export default function Card(props: cardPropType) {
  const theme = useThemeStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string>();
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  return (
    <div className="card w-96 hover:bg-accent" data-theme={stateTheme}>
      <figure>
        <img className="card-img-top" src={props.imageUrl} alt="image!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <div className="card-actions justify-end px-4 py-4"></div>
      </div>
    </div>
  );
}
