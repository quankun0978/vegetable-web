import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

const Chatbot = () => {
  const dataInfo = useSelector((state) => state.user.dataInfo);

  useEffect(() => {}, []);

  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "31d1eec36793855081b8f5e9e18223ba1",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        userId: dataInfo.user_id,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, [dataInfo.user_id]);
  return <div></div>;
};

export default memo(Chatbot);
