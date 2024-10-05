/** @jsx webjsx.createElement */
import * as webjsx from "webjsx";
import { Bloom } from "bloom-router";

let $: (selector: string) => any = document.querySelector.bind(document);

const bloom = new Bloom("app");

bloom.page("/edit-profile", async function* homePage() {
  let name: string = "";
  let age: string = "";

  function onNext() {
    name = $("#name")!.value;
    bloom.render();
  }

  function onSave() {
    age = $("#age")!.value;
    alert(name + ":" + age);
    bloom.goto(`/completed`);
  }

  while (true) {
    yield (
      <div>
        <label>Enter your name</label>
        <input id="name" type="text" value="" />
        <button onclick={onNext}>Next</button>
      </div>
    );
    yield (
      <div>
        <label>Your age?</label>
        <input id="age" type="text" value="" />
        <button onclick={onSave}>Save</button>
      </div>
    );
  }
});

bloom.goto("/edit-profile");
