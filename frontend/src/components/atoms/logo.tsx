// import { useContext } from 'react';
// import { useRecoilValue } from 'recoil';
import JeemLogo from '../../assets/gLogo.png';

// import { settingsState } from 'state/settings';

// import { ChainlitContext } from 'client-types/*';

interface Props {
  width?: number;
  style?: React.CSSProperties;
}

export const Logo = ({ style }: Props) => {
  // const { theme } = useRecoilValue(settingsState);
  // const apiClient = useContext(ChainlitContext);

  return (
    <img
      src={JeemLogo}
      alt="logo"
      style={{
        borderRadius: "1100000px",
        filter: 'contrast(5)',
        ...style
      }}
    />
  );
};
