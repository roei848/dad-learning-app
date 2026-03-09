import React, { useEffect } from 'react';
import styled from 'styled-components';

export interface ExitConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  useEffect(() => {
    const val = isOpen ? 'hidden' : '';
    document.body.style.overflow = val;
    document.documentElement.style.overflow = val;
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ExitConfirmModalWrapper>
      <div className="overlay" onClick={onCancel} />
      <div className="modal">
        <p className="message">Your progress will be lost. Are you sure you want to exit?</p>
        <div className="actions">
          <button className="btn-keep" onClick={onCancel}>Keep going</button>
          <button className="btn-exit" onClick={onConfirm}>Exit</button>
        </div>
      </div>
    </ExitConfirmModalWrapper>
  );
};

export default ExitConfirmModal;

const ExitConfirmModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }

  .modal {
    position: relative;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    padding: ${({ theme }) => theme.spacing.xl};
    max-width: 420px;
    width: calc(100% - 48px);
    text-align: center;
  }

  .message {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) => theme.typography.lineHeight};
    margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  }

  .actions {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    justify-content: center;
  }

  .btn-keep {
    flex: 1;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    transition: opacity ${({ theme }) => theme.transition};

    &:hover {
      opacity: 0.88;
    }
  }

  .btn-exit {
    flex: 1;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    background: none;
    border: 1.5px solid ${({ theme }) => theme.colors.wrong};
    border-radius: 999px;
    cursor: pointer;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.wrong};
    transition: background ${({ theme }) => theme.transition};

    &:hover {
      background: rgba(229, 115, 115, 0.08);
    }
  }
`;
