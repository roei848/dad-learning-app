import React from 'react';
import styled from 'styled-components';

export interface StageHeaderPresenterProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StageHeader: React.FC<StageHeaderPresenterProps> = ({ title, description, icon }) => {
  return (
    <StageHeaderWrapper>
      <div className="stage-header__inner">
        <div className="stage-header__icon" aria-hidden="true">
          {icon}
        </div>
        <div className="stage-header__text">
          <h1 className="stage-header__title">{title}</h1>
          <p className="stage-header__description">{description}</p>
        </div>
      </div>
    </StageHeaderWrapper>
  );
};

export default StageHeader;

// ui-ux-pro-max: Claymorphism — soft inner+outer shadows, 12px radius, 200ms ease-out
const StageHeaderWrapper = styled.header`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};

  .stage-header__inner {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }

  .stage-header__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius};
    /* ui-ux-pro-max: inner shadow for Claymorphism depth */
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.08),
      0 1px 3px rgba(0, 0, 0, 0.06);
    color: ${({ theme }) => theme.colors.primary};
  }

  .stage-header__text {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  .stage-header__title {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.heading};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
  }

  .stage-header__description {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.textLight};
    line-height: ${({ theme }) => theme.typography.lineHeight};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};

    .stage-header__title {
      font-size: ${({ theme }) => theme.typography.subheading};
    }

    .stage-header__description {
      font-size: 16px;
    }
  }
`;
