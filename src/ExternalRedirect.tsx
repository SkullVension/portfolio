import { useEffect } from "react";

const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.href = to;
  }, []);
  return null;
};

export default ExternalRedirect;
