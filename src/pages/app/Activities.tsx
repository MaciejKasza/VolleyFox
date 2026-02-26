import { useTranslation } from "react-i18next";
import { Header } from "../../components/pageHeader/Header";

export default function Activities() {
  const { t } = useTranslation();
  return (
    <div>
      <Header
        title={t("common.header.activities")}
        subtitle={t("common.header.activitiesSubtitle")}
      />
    </div>
  );
}
