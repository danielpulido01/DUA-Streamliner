// HomePage.tsx (ejemplo)
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

<div className="home-grid">
  <section className="card">t("home.summary-cards")Summary cards</section>
  <section className="table">t("home.uploaded-files-table")</section>
  <section className="activity">t("home.activity-log")</section>
</div>
