import { FC, useEffect, useState } from "react";
import { HoverBox } from "./HoverBox";
import { LogDispatch } from "./Log";
import { Log } from "./reducer";

let Interval: NodeJS.Timer;

export const Weight: FC<{ weight: number, dispatch: LogDispatch }> = props => {
    const [input, setInput] = useState(props.weight);
    useEffect(() => { setInput(props.weight) }, [props.weight]);
    useEffect(() => {
        props.dispatch({ payload: { weight: input } })
    }, [input, props.dispatch])
    return <div className="group relative">
        <input className="input" type={"number"} value={input} onChange={e => setInput(Number(e.target.value))} />
        <HoverBox className="">
            <div className="grid grid-cols-4 grid-rows-2 rounded place-items-center w-max">
                {[-2.5, -5, -7.5, -10, 2.5, 5, 7.5, 10].map(e =>
                    <div onClick={() => props.dispatch({ payload: { weight: props.weight + e } })} className="cursor-pointer p-1 hover:bg-secondary w-full rounded">{(e > 0 ? "+" : "") + e}</div>)
                }
            </div>
        </HoverBox>
    </div>
}