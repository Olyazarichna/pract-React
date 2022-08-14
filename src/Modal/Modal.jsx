// import { Component } from 'react';
import { useEffect } from 'react';
import { ModalStyled, Overlay } from './Modal.styled';
import { Button } from '../Button/Button';

export const Modal = ({ poster, closeModal }) => {
  useEffect(() => {
    const onEsc = e => {
      if (e.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, [closeModal]);

  return (
    <Overlay>
      <ModalStyled>
        <img src={`https://image.tmdb.org/t/p/w400${poster}`} alt="" />
        <Button text="Close" handleClick={closeModal} />
      </ModalStyled>
    </Overlay>
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.onEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onEsc);
//   }

//   onEsc = (e) => {
//     if (e.code === 'Escape') this.props.closeModal();
//   };

//   render() {
//     const { poster, closeModal } = this.props;
//     return (
//       <Overlay>
//         <ModalStyled>
//           <img src={`https://image.tmdb.org/t/p/w400${poster}`} alt="" />
//           <Button text="Close" handleClick={closeModal} />
//         </ModalStyled>
//       </Overlay>
//     );
//   }
// }
