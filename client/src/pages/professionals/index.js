import React from 'react';
import { MainLib } from 'lib';
import { PageContainer } from 'components';
// страница со всеми работниками
const PageProfessionals = () => (
  <PageContainer>
    {MainLib.professionals.title}
  </PageContainer>
);

export default PageProfessionals;
