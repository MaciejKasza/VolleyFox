import { useTranslation } from "react-i18next";
import { Header } from "../../components/pageHeader/Header";

export default function Callendar() {
  const { t } = useTranslation();

  return (
    <div>
      <Header
        title={t("common.header.callendar")}
        subtitle={t("common.header.callendarSubtitle")}
      />
    </div>
  );
}
