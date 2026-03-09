import React from 'react';
import styled from 'styled-components';

export interface CategoryCardPresenterProps {
  category: string;
  icon: React.ReactNode;
  sectionCount: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardPresenterProps> = ({
  category,
  icon,
  sectionCount,
  onClick,
}) => {
  return (
    <CategoryCardWrapper onClick={onClick}>
      <div className="icon-container">{icon}</div>
      <h2 className="card-title">{category}</h2>
      <span className="card-count">
        {sectionCount} {sectionCount === 1 ? 'section' : 'sections'}
      </span>
    </CategoryCardWrapper>
  );
};

export default CategoryCard;

const CategoryCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
  }

  .card-title {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.heading};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    line-height: 1.25;
  }

  .card-count {
    font-size: ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.textLight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
`;
