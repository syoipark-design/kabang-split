import statusbar from '../assets/statusbar.svg';

export default function StatusBar() {
  return (
    <img
      src={statusbar}
      alt=""
      style={{
        position: 'absolute',
        left: '35.31px',
        top: '18.76px',
        width: '307.33px',
        height: '20.36px',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
