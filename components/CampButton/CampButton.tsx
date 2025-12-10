import css from './CampButton.module.css';
import Link from 'next/link';

interface CampButtonProps {
  href?: string;
  handleButtonClick?: () => void;
  textBtn: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  styleBtn?: 'primary' | 'secondary';
}

const CampButton = ({
  href,
  handleButtonClick,
  textBtn,
  type = 'button',
  disabled = false,
  styleBtn = 'primary',
}: CampButtonProps) => {
  if (href) {
    return (
      <Link href={href} className={css.campButton}>
        {textBtn}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleButtonClick}
      className={
        styleBtn === 'primary' ? css.campButton : css.campButtonSecondary
      }
      disabled={disabled}
    >
      {textBtn}
    </button>
  );
};

export default CampButton;
