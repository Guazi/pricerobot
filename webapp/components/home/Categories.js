import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, List } from 'antd';
const { Meta } = Card;

const data = [
  {
    title: 'Computers',
    content: [
      { name: 'Graphics Cards', link: '/search/?Category="Graphics+Cards"' },
      { name: 'Tablets', link: '/search/?Category="Tablets"' },
      { name: 'Laptops', link: '/search/?Category="Laptops"' },
      { name: 'Desktops', link: '/search/?Category="Desktops"' },
      { name: 'HDD', link: '/search/?Category="Internal+Hard+Drives"' },
      { name: 'SSD', link: '/search/?Category="Internal+Solid+State+Drives"' },
      { name: 'Computer Cases', link: '/search/?Category="Computer+Cases"' },
      { name: 'Routers', link: '/search/?Category="Routers"' }
    ]
  },
  {
    title: 'Sports & Outdoors',
    content: [
      { name: 'Hunting', link: '/search/?Category="Hunting"' },
      { name: 'Fishing', link: '/search/?Category="Fishing"' },
      { name: 'Archery', link: '/search/?Category="Archery"' },
      { name: 'Shooting', link: '/search/?Category="Shooting"' },
      { name: 'Baseball & Softball', link: '/search/?Category="Baseball+%26+Softball"' },
      { name: 'Cardio Training', link: '/search/?Category="Cardio+Training"' },
      { name: 'Sports Training', link: '/search/?Category="Sports+Training"' },
      { name: 'Skiing', link: '/search/?Category="Skiing"' }
    ]
  },
  {
    title: 'Electronics',
    content: [
      { name: 'LED & LCD TVs', link: '/search/?Category="LED+%26+LCD+TVs"' },
      { name: 'SLR Cameras', link: '/search/?Category="Interchangeable+Lens+Cameras"' },
      { name: 'Camera Lenses', link: '/search/?Category="Camera+Lenses"' },
      { name: 'Film Cameras', link: '/search/?Category="Film+Cameras"' },
      { name: 'Car Audio', link: '/search/?Category="Car+Audio"' },
      { name: 'Batteries & Chargers', link: '/search/?Category="Batteries+%26+Chargers"' },
      { name: 'Landline Phones', link: '/search/?Category="Landline+Phones"' },
      { name: 'Digital Pianos', link: '/search/?Category="Digital+Pianos"' }
    ]
  },
  {
    title: 'Health & Beauty',
    content: [
      { name: 'Body', link: '/search/?Category="Body"' },
      { name: 'Face', link: '/search/?Category="Face"' },
      { name: 'Shampoo', link: '/search/?Category="Shampoo"' },
      { name: 'Conditioner', link: '/search/?Category="Conditioner"' },
      { name: 'Styling Products', link: '/search/?Category="Styling+Products"' },
      { name: 'Womens', link: '/search/?Category="Women%27s"' },
      { name: 'Nail Polish', link: '/search/?Category="Nail+Polish"' },
      { name: 'Mens', link: '/search/?Category="Men%27s"' }
    ]
  },
  {
    title: 'Home & Furniture',
    content: [
      { name: 'Chairs', link: '/search/?Category="Chairs"' },
      { name: 'Sofas & Couches', link: '/search/?Category="Sofas+%26+Couches"' },
      { name: 'Bookcases', link: '/search/?Category="Bookcases"' },
      { name: 'Table Lamps', link: '/search/?Category="Table+Lamps"' },
      { name: 'Floor Lamps', link: '/search/?Category="Floor+Lamps"' },
      { name: 'Area Rugs', link: '/search/?Category="Area+Rugs"' },
      { name: 'Draperies & Curtains', link: '/search/?Category="Draperies+%26+Curtains"' },
      { name: 'Home Bar Furniture', link: '/search/?Category="Home+Bar+Furniture"' }
    ]
  },
  {
    title: 'Appliances',
    content: [
      { name: 'Ranges', link: '/search/?Category="Freestanding+Ranges"' },
      { name: 'Dishwashers', link: '/search/?Category="Built-In+Dishwashers"' },
      { name: 'Air Conditioners', link: '/search/?Category="Air+Conditioners"' },
      { name: 'Robotic Vacuums', link: '/search/?Category="Robotic+Vacuums"' },
      { name: 'Microwaves', link: '/search/?Category="Microwave+Ovens"' },
      { name: 'Speciality Appliances', link: '/search/?Category="Specialty+Appliances"' },
      { name: 'Coffee, Tea & Espresso', link: '/search/?Category="Coffee%2C+Tea+%26+Espresso+Appliances"' },
      { name: 'Ovens & Toasters', link: '/search/?Category="Ovens+%26+Toasters"' }
    ]
  }
];

const Categories = ({}) =>
  <div>
    <Row type="flex" justify="center" align="top">
      <Col xs={24} md={12}>
        <h4 className="align-center">Categories</h4>
      </Col>
    </Row>
    <div className="cat-card">
      <Row type="flex" justify="center">
        <List
          grid={{ gutter: 18, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={data}
          renderItem={item =>
            <List.Item>
              <Card title={item.title}>
                {item.content.map(function(object, i) {
                  return (
                    <div className={'row'} key={i}>
                      {[
                        <Link className="pad-5" key={i} to={object.link}>
                          {object.name}
                        </Link>
                      ]}
                    </div>
                  );
                })}
              </Card>
            </List.Item>
          }
        />
      </Row>
    </div>
  </div>
;

// SearchResults.propTypes = {
//   toggleTopic: PropTypes.func,
//   currentTopics: PropTypes.arrayOf(PropTypes.string)
// };

export default Categories;
