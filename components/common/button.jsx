import Image from "next/image";
import Link from "next/link";

export const Button = ({ size, text, style, color, iconLeft, iconRight, onClick, href }) => {
    const buttonStyles =
        style === 'fill' ? `btn-fill-${color}` :
            style === 'line' ? `btn-line-${color}` :
                style === 'ghost' ? `btn-ghost-${color}` : '';

    const buttonSize =
        !text ? `min-w-[3rem]` :
            size === 'small' ?
                `min-w-[8.5rem]` :
                size === 'medium' ?
                    `min-w-[10rem]` :
                    size === 'large' ?
                        `min-w-[18.75rem]` : '';

    const buttonIconLeft = iconLeft === "placeholder" ? <Image src="/placeholder.png" alt="Icon" width={20} height={20} /> : null;

    const buttonIconRight = iconRight === "placeholder" ? <Image src="/placeholder.png" alt="Icon" width={20} height={20} /> : null;

    const buttonElement = <button onClick={onClick} className={`btn text-btn uppercase px-3 h-10 flex justify-center items-center gap-2 rounded-sm ${buttonStyles} ${buttonSize}`}>
        {/* {buttonIconLeft && <span className={`icon ${buttonIconLeft}`}></span>} */}
        {buttonIconLeft}
        {text && <span>{text}</span>}
        {buttonIconRight}
        {/* {buttonIconRight && <span className={`icon ${buttonIconRight}`}></span>} */}
    </button>

    return href ? (<Link href={href}>{buttonElement}</Link>) : buttonElement

}
export default Button