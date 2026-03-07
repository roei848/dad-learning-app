import React from 'react';
import styled from 'styled-components';

import SectionCardContainer from '../../components/sectionCard/SectionCardContainer';
import type { SectionMeta } from '../../types';

export interface HomePresenterProps {
  sections: SectionMeta[];
  onStartSection: (sectionId: string) => void;
}

const Home: React.FC<HomePresenterProps> = ({ sections, onStartSection }) => {
  return (
    <HomeWrapper>
      <div className="header">
        <h1 className="heading">Hello Dad! Ready to learn?</h1>
        <p className="subtext">Choose a topic to start your English session.</p>
      </div>
      <div className="sections-grid">
        {sections.map(section => (
          <SectionCardContainer
            key={section.section_id}
            sectionId={section.section_id}
            title={section.title}
            category={section.category}
            icon={section.icon}
            difficulty={section.difficulty}
            onStart={onStartSection}
          />
        ))}
      </div>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  .header {
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
    text-align: center;
  }

  .heading {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.heading};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.25;
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }

  .subtext {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.subheading};
    color: ${({ theme }) => theme.colors.textLight};
    line-height: ${({ theme }) => theme.typography.lineHeight};
    margin: 0;
  }

  .sections-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
`;
