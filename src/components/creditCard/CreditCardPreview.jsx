import React from 'react';
import './css/credit-card.css';
import './css/index.css';

const CARD_FLAGS = {
  visa: {
    colors: ['#436D99', '#2d57f2'],
    logo: '/cc-visa.svg',
  },
  mastercard: {
    colors: ['#df6f29', '#c69347'],
    logo: '/cc-mastercard.svg',
  },
  default: {
    colors: ['black', 'grey'],
    logo: '/cc-default.svg',
  },
};

function getCardFlag(number) {
  if (/^4\d{0,15}/.test(number)) return 'visa';
  if (/(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/.test(number)) return 'mastercard';
  return 'default';
}

export default function CreditCardPreview({ number = '', name = '', expiry = '', cvc = '' }) {
  const flag = getCardFlag(number.replace(/\s/g, ''));
  const { colors, logo } = CARD_FLAGS[flag];

  return (
    <section className="cc">
      <div className="cc-bg">
        <svg width="360" height="230" viewBox="0 0 360 230" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <g>
              <path d="M451.518 -135.506C473.881 -89.3531 414.166 -13.4917 318.142 33.9349C222.118 81.3615 126.147 82.3939 103.784 36.2409C81.4215 -9.91221 141.136 -85.7735 237.16 -133.2C333.184 -180.627 429.156 -181.659 451.518 -135.506Z" fill={colors[0]} />
            </g>
            <g>
              <path d="M399.134 -169.756C421.497 -123.603 361.783 -47.742 265.758 -0.315356C169.734 47.1113 73.7629 48.1437 51.4003 1.99062C29.0377 -44.1624 88.7521 -120.024 184.776 -167.45C280.8 -214.877 376.772 -215.909 399.134 -169.756Z" fill={colors[1]} />
            </g>
          </g>
        </svg>
      </div>
      <div className="cc-logo">
        <span><img src="/cc-icon.svg" alt="ícone padrão de cartão" /></span>
        <span><img src={logo} alt="bandeira do cartão" /></span>
      </div>
      <div className="cc-info">
        <div className="cc-number">{number || '1234 5678 9012 3456'}</div>
        <div className="cc-row">
          <div className="cc-expiration">
            <div className="label">Expiração</div>
            <div className="value">{expiry || '02/32'}</div>
          </div>
          <div className="cc-security">
            <div className="label">CVC</div>
            <div className="value">{cvc || '123'}</div>
          </div>
        </div>
        <div className="cc-holder">
          <div className="label">Nome do titular</div>
          <div className="value">{name || 'FULANO DA SILVA'}</div>
        </div>
        <img className="cc-chip" src="/cc-chip.svg" alt="ícone de chip de cartão de crédito" />
      </div>
    </section>
  );
} 