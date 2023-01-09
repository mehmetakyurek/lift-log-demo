import { FC, ReactNode } from "react"

export const HoverBox: FC<{ children: ReactNode, className?: string }> = props => {
    return <div className={"group-hover:visible invisible absolute bg-tertiary hover:visible p-3 z-10 rounded " + (props.className ?? "")}>{props.children}</div>
}
