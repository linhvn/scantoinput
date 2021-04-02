## Scan Barcode To Input
Scan barcode to input


## Prerequisites
This one depend on jquery library.

## Setup
- Add  `<script src="scantoinput.jquery.js"></script>` into the html file. At the end of `<body>` tag.
- Add `sti-input` to the input class
- Add `sti-manual-click` to the button class

## Example
```
<body>
    <form>
        <input id="txtInput" class="sti-input" />
        <button id="btnSubmit" type="button" class="sti-manual-click">Submit</button>
    </form>

    ...
    
    <script src="scantoinput.jquery.js"></script>
</body>
```