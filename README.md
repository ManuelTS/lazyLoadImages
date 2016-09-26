# Description
A pure JavaScript lazy image loader.

# Usage:
Put all the content of you _src_ attribute of the _img_ tag into the _data-url_ attribute. For safety, on page load the _src_ attribute of an image with an _data-url_ attribute is removed. Now, if the image gets visible on screen its _src_ will be set and _data-url_ removed.
