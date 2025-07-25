// components/HelmetWrapper.tsx
import Head from 'next/head';

interface HelmetWrapperProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const HelmetWrapper: React.FC<HelmetWrapperProps> = ({ title, description, keywords }) => {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </Head>
  );
};

export default HelmetWrapper;
