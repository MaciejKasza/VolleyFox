import { useTranslation } from "react-i18next";
import { Header } from "../../components/pageHeader/Header";

export default function Profile() {
  const { t } = useTranslation();
  return (
    <div>
      <Header
        title={t("common.header.profile")}
        subtitle={t("common.header.profileSubtitle")}
      />
    </div>
  );
}
