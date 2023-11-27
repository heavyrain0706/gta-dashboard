import { FC, PropsWithChildren } from 'react';
import styles from "./Layout.module.scss";
import { useRouter } from 'next/router';

const Layout: FC<PropsWithChildren> = ({ children }) => {


  return (
    <div className={styles.layout}>
        <div className={styles.layout__container}>
            <div className={styles.layout__content}>
                {children}
            </div>
        </div>
    </div>
  );
};
export default Layout;