const naclFactory = require("js-nacl");

const main = async () => {
  const nacl = naclFactory.instantiate((n) => {});
  console.log(nacl); // Promise { <pending> }

  const awaitedNacl = await nacl;
  console.log(awaitedNacl.random_bytes(32)); // <Uint8Array>

  let unawaited = undefined;
  naclFactory.instantiate((nacl) => {
    unawaited = nacl.random_bytes(32);
  });

  console.log(typeof unawaited); // undefined

  let awaited = undefined;
  await naclFactory.instantiate((nacl) => {
    awaited = nacl.random_bytes(32);
  });

  console.log(awaited); // <Uint8Array>
};

main()
  .then(() => console.log("Done!"))
  .catch((e) => console.error("Error:", e));
