# varname

you can't name variables. i can't either. but at least one of us has an AI.

## install

\```bash
npm install -g varname
\```

## setup

get a free Gemini key at https://aistudio.google.com/app/apikey

\```bash
export GEMINI_API_KEY=your_key_here
\```

## usage

\```bash
varname "checks if user is logged in"
\```

\```
  suggestions for "checks if user is logged in":

    isLoggedIn
    isUserAuthenticated
    userLoggedInOrSoWeThink
    pleaseBeLoggedIn
    whyAreTheyNeverLoggedIn

  good luck. you'll need it.
\```

\```bash
varname "the thing that breaks in prod every friday" --lang python
echo "i have no idea what this does" | varname
\```

## does it give good names?

sometimes. mostly it gives you names and a small existential crisis. both are useful.

## license

MIT — do whatever, i'm not your mom
