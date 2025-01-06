import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

// 定义接口扩展原有的 input 属性
interface TradingInputProps extends React.ComponentProps<"input"> {
  label?: string; // 添加可选的 label 属性
}

const TradingInput = React.forwardRef<HTMLInputElement, TradingInputProps>(
  ({ className, type, ...props }, ref) => {
    const [valueLength, setValueLength] = React.useState(0);
    return (
      <div className="relative">
        <div
          className={cn(
            "text-muted-foreground pointer-events-none absolute inset-y-0 start-2 flex items-center justify-center ps-3 peer-disabled:opacity-50 font-bold",
            className
          )}
        >
          {props.label}
        </div>
        <Input
          className={cn(
            "bg-muted font-bold peer ps-16 pe-6 h-14 !text-lg text-right rounded-full focus-visible:ring-2 focus-visible:ring-secondary focus-visible:shadow-[0_0_0_2px_rgba(147,51,234,0.3)]",
            valueLength > 10 && "!text-md"
          )}
          type={type}
          ref={ref}
          maxLength={15}
          {...props}
          onChange={(e) => {
            props.onChange?.(e);
            setValueLength(e.target.value.length);
          }}
        />
      </div>
    );
  }
);
TradingInput.displayName = "TradingInput";

export { TradingInput };