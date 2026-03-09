import React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import type { CategoryMeta, SectionMeta } from '../../types';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import SectionCardContainer from '../../components/sectionCard/SectionCardContainer';

export interface HomePresenterProps {
  selectedCategory: string | null;
  categories: CategoryMeta[];
  sections: SectionMeta[];
  onSelectCategory: (category: string) => void;
  onBackToCategories: () => void;
  onStartSection: (sectionId: string) => void;
}

const Home: React.FC<HomePresenterProps> = ({
  selectedCategory,
  categories,
  sections,
  onSelectCategory,
  onBackToCategories,
  onStartSection,
}) => {
  return (
    <HomeWrapper>
      <div className="header">
        <h1 className="heading">Hello Dad! Ready to learn?</h1>
        <p className="subtext">
          {selectedCategory
            ? `Explore ${selectedCategory} topics`
            : 'Choose a category to start your English session.'}
        </p>
      </div>

      {selectedCategory ? (
        <>
          <button className="back-button" onClick={onBackToCategories}>
            <ArrowLeft size={18} />
            <span>Back to categories</span>
          </button>
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
        </>
      ) : (
        <div className="categories-grid">
          {categories.map(cat => (
            <CategoryCard
              key={cat.name}
              category={cat.name}
              icon={cat.icon}
              sectionCount={cat.sectionCount}
              onClick={() => onSelectCategory(cat.name)}
            />
          ))}
        </div>
      )}
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

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.cardBackground};
    border: none;
    border-radius: 999px;
    box-shadow: ${({ theme }) => theme.shadow};
    cursor: pointer;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    transition: box-shadow ${({ theme }) => theme.transition},
      transform ${({ theme }) => theme.transition};

    &:hover {
      box-shadow: ${({ theme }) => theme.shadowHover};
      transform: translateX(-2px);
    }
  }

  .categories-grid {
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

  @media (max-width: 600px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};

    .heading {
      font-size: 28px;
    }

    .subtext {
      font-size: ${({ theme }) => theme.typography.body};
    }
  }
`;
