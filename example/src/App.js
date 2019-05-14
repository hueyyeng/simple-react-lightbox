import React, { Component } from "react";

import SimpleReactLightbox, { SRLConsumer } from "simple-react-lightbox";

export default class App extends Component {
  render() {
    return (
      <div>
        <SimpleReactLightbox>
          <SRLConsumer>
            {values => {
              return (
                <button onClick={values.handleLightbox}>Open Lightbox</button>
              );
            }}
          </SRLConsumer>
          <div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla,
              illo cum nobis laborum, ullam dolorem iure odit id placeat in est,
              aliquam asperiores dolor ipsum ab! Dolores aspernatur odit totam
              quis alias voluptate ex non illo itaque, magnam iure distinctio.
              Ullam, quia quisquam! Illum, praesentium, ipsum asperiores beatae
              et laudantium eligendi rem officiis natus laborum dignissimos id
              repellat accusamus inventore tempora blanditiis facilis. Hic unde
              nostrum qui, a numquam voluptatum officiis commodi voluptate
              accusantium similique sequi quidem adipisci reprehenderit quisquam
              eveniet earum doloremque, autem illum dolore? Deserunt, sit
              corporis repellendus quasi fugit voluptatem mollitia
              exercitationem ipsa ipsam earum inventore odit.
            </p>
            <img src="https://picsum.photos/400" />
            <img src="https://picsum.photos/500" />
            <p>
              <img src="https://picsum.photos/600" />
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              aperiam iusto ea beatae perspiciatis fugit soluta nihil facilis
              inventore culpa.
            </p>
            <span>
              <img src="https://picsum.photos/800" />
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              aperiam iusto ea beatae perspiciatis fugit soluta nihil facilis
              inventore culpa.
            </p>
            <div>
              <img src="https://picsum.photos/900" />
            </div>
          </div>
        </SimpleReactLightbox>
      </div>
    );
  }
}
