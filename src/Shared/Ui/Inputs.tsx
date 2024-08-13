import {
  InputHTMLAttributes,
  Ref,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useId,
} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}
interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  className?: string;
  list?: {}[];
}

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  className?: string;
}

interface IDateProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

interface IPropsList {
  title?: string;
  _id?: string;
}

export const Input = forwardRef(
  ({ className = "", label, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    const appliedClass = `${className} `;
    const inputId = useId();
    return (
      <>
        <div
          className={`${appliedClass} flex border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}
        >
          <label
            htmlFor={inputId}
            className=" p-2 font-semibold  flex justify-center min-w-20"
          >
            {label}
          </label>
          <input
            ref={ref}
            id={inputId}
            className=" pl-3 text-black  outline-none flex-1 border-none  bg-transparent py-1.5  placeholder:text-gray-400 truncate caret-mainColor "
            {...rest}
          />
        </div>
      </>
    );
  }
);

export const GroupInput = forwardRef(
  (rest: IProps, ref: Ref<HTMLInputElement>) => {
    return (
      <>
        <Input ref={ref} {...rest} />
      </>
    );
  }
);

export const SelectInput = forwardRef(
  (
    { className = "", label, list = [], ...rest }: ISelectProps,
    ref: Ref<HTMLSelectElement>
  ) => {
    const appliedClass = `${className} `;
    const inputId = useId();
    return (
      <>
        <div
          className={`${appliedClass} mt-4 flex flex-1 border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}
        >
          <label
            htmlFor={inputId}
            className=" p-2 font-semibold  flex justify-center min-w-12 items-center"
          >
            {label}
          </label>
          <select
            ref={ref}
            id={inputId}
            {...rest}
            className="px-2 rounded-r-md outline-none flex-1 border-none text-center  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
          >
            {list?.map(({ _id, title }: IPropsList) => (
              <option key={_id} value={_id} className="text-black">
                {title}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
);

export const Textarea = forwardRef(
  (
    { className = "", label, ...rest }: ITextareaProps,
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const appliedClass = `${className} `;
    const inputId = useId();
    return (
      <>
        <div
          className={`${appliedClass} mt-4 flex border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}
        >
          <label
            htmlFor={inputId}
            className=" p-2 font-semibold  flex justify-center min-w-12 items-center"
          >
            {label}
          </label>
          <textarea
            ref={ref}
            id={inputId}
            {...rest}
            className="px-2 rounded-r-md outline-none flex-1 border-none flex bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </>
    );
  }
);

export const DateInput = forwardRef(
  (
    { className = "", label, ...rest }: IDateProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const appliedClass = `${className} `;
    const inputId = useId();
    return (
      <>
        <div
          className={`${appliedClass} w-fit mt-4 flex border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}
        >
          <label
            htmlFor={inputId}
            className=" p-2 font-semibold  flex justify-center min-w-12 items-center"
          >
            {label}
          </label>
          <input
            type="datetime-local"
            ref={ref}
            id={inputId}
            {...rest}
            className="px-2 rounded-r-md text-center outline-none flex-1 border-none flex bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
          ></input>
        </div>
      </>
    );
  }
);

interface DetailsProps {
  label: string;
  className?: string;
  content: string;
  icon?: React.ReactNode;
}
export const DetailsInput = forwardRef(
  (
    { className = "", label, content, icon, ...rest }: DetailsProps,
    ref: Ref<HTMLParagraphElement>
  ) => {
    const appliedClass = `${className} `;

    return (
      <>
        <div
          className={`${appliedClass} flex items-center border-2 rounded-lg `}
        >
          <label className=" p-2 font-semibold  flex justify-center min-w-12">
            {label}
          </label>
          <p
            ref={ref}
            title={content}
            className="pl-1.5 lg:pl-3 text-black flex flex-1 py-1.5 ms-0.5 truncate  "
            {...rest}
          >
            <span className="truncate">{content}</span>
          </p>
          {icon && (
            <span className="flex items-center me-3 pl-3 text-white ">
              {icon}
            </span>
          )}
        </div>
      </>
    );
  }
);
