import { Row, Col } from 'antd';
import { useTranslation } from 'next-i18next';
import AppRoot from '../src/hoc/AppRoot';

function SettingsPage() {
  const { t } = useTranslation();

  return (
    <AppRoot>
      <Row className="header" gutter={[16, 16]}>
        <Col span={24}>
          <h1>{t('Configuration')}</h1>
        </Col>
      </Row>
      <Row className="content" gutter={[16, 16]}>
        <Col span={24}>
          <p>{t('This page is under construction.')}</p>
        </Col>
      </Row>
    </AppRoot>
  );
}

export default SettingsPage;