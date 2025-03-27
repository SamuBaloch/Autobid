import React from 'react'

import PropTypes from 'prop-types'

import './category-card.css'

const CategoryCard = (props) => {
  return (
    <div className={`category-card-category-card ${props.rootClassName} `}>
      <img
        alt={props.imageAlt}
        src={props.categoryImg}
        className="category-card-image"
      />
      <span className="category-card-text">{props.name}</span>
    </div>
  )
}

CategoryCard.defaultProps = {
  categoryImg:
    'https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEyfHxjaGFpcnxlbnwwfHx8fDE2NTI4MTgxODk&ixlib=rb-1.2.1&w=1500',
  imageAlt: 'image',
  name: 'Desks',
  rootClassName: '',
}

CategoryCard.propTypes = {
  categoryImg: PropTypes.string,
  imageAlt: PropTypes.string,
  name: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default CategoryCard
