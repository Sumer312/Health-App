import { programEnum } from "./home";
import styles from "../Home.module.css";
import { useParams } from "react-router-dom";
import { useReducer, Reducer } from "react";
import useAuthStore from "../components/store/auth";

enum ActionEnum {
  HEIGHT = "height",
  WEIGHT = "weight",
  DESIRED_WEIGHT = "desiredWeight",
  BMI = "bmi",
  TIME_FRAME = "timeFrame",
}

interface StateType {
  height: number;
  weight: number;
  desiredWeight?: number;
  timeFrame: number;
  bmi: number;
}

interface ActionType {
  type: ActionEnum;
  payload: number;
}

export default function UserInput() {
    const ID = useAuthStore(state => state.ID);
  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
    (state: StateType, action: ActionType): StateType => {
      switch (action.type) {
        case ActionEnum.HEIGHT:
          return {
            height: action.payload,
            weight: state.weight,
            desiredWeight: state.desiredWeight,
            timeFrame: state.timeFrame,
            bmi: state.bmi,
          };
        case ActionEnum.WEIGHT:
          return {
            height: state.height,
            weight: action.payload,
            desiredWeight: state.desiredWeight,
            timeFrame: state.timeFrame,
            bmi: state.bmi,
          };
        case ActionEnum.DESIRED_WEIGHT:
          return {
            height: state.height,
            weight: state.weight,
            desiredWeight: action.payload,
            timeFrame: state.timeFrame,
            bmi: state.bmi,
          };
        case ActionEnum.BMI:
          return {
            height: state.height,
            weight: state.weight,
            desiredWeight: state.desiredWeight,
            timeFrame: state.timeFrame,
            bmi: action.payload,
          };
        case ActionEnum.TIME_FRAME:
          return {
            height: state.height,
            weight: state.weight,
            desiredWeight: state.desiredWeight,
            timeFrame: action.payload,
            bmi: state.bmi,
          };

        default:
          throw new Error(`Unhandled action type ${action.type}`);
      }
    },
    {
      height: NaN,
      weight: NaN,
      desiredWeight: NaN,
      timeFrame: NaN,
      bmi: NaN,
    }
  );

  const type = JSON.stringify(useParams());
  return (
    <main className={styles.main}>
      <label htmlFor="height">Height (in cm)</label>
      <input
        type="number"
        id="height"
        className="input input-bordered input-accent w-full max-w-xs"
        step="10"
        value={state.height}
        onChange={(event) => {
          if (event.target !== null) {
            dispatch({
              type: ActionEnum.HEIGHT,
              payload: parseInt(event?.target.value),
            });
          }
        }}
      />
      <label htmlFor="weight">Weight (in kg)</label>
      <input
        type="number"
        id="weight"
        className="input input-bordered input-accent w-full max-w-xs"
        step="10"
        value={state.weight}
        onChange={(event) => {
          if (event.target !== null) {
            dispatch({
              type: ActionEnum.WEIGHT,
              payload: parseInt(event?.target.value),
            });
          }
        }}
      />
      {(JSON.parse(type).type === programEnum.FAL_LOSS ||
        JSON.parse(type).type === programEnum.MUSCLE) && (
        <>
          <label htmlFor="desiredWeight">Desired Weight (in kg)</label>
          <input
            type="number"
            id="desiredWeight"
            className="input input-bordered input-accent w-full max-w-xs"
            step="10"
            value={state.desiredWeight}
            onChange={(event) => {
              if (event.target !== null) {
                dispatch({
                  type: ActionEnum.DESIRED_WEIGHT,
                  payload: parseInt(event?.target.value),
                });
              }
            }}
          />
          <label htmlFor="timeFrame">Time Frame (in weeks)</label>
          <input
            type="number"
            id="timeFrame"
            className="input input-bordered input-accent w-full max-w-xs"
            min={
              state.desiredWeight
                ? (state.desiredWeight - state.weight) * 2
                : ""
            }
            value={state.timeFrame}
            onChange={(event) => {
              if (event.target !== null) {
                dispatch({
                  type: ActionEnum.TIME_FRAME,
                  payload: parseInt(event?.target.value),
                });
              }
            }}
          />
        </>
      )}

      <label htmlFor="bmi">BMI</label>
      <input
        type="number"
        id="bmi"
        className="input input-bordered input-accent w-full max-w-xs"
        step="10"
        value={state.bmi}
        onChange={(event) => {
          if (event.target !== null) {
            dispatch({
              type: ActionEnum.BMI,
              payload: parseInt(event?.target.value),
            });
          }
        }}
      />

      <button type="submit" className="btn btn-outline btn-accent">
        Submit
      </button>
    </main>
  );
}
