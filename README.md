Zoomer
=====
Zoomer is simple and nice image zoom class. It's shows zoomed image inside original.

![Screenshot](http://mifjs.net/assets/images/queen.jpg)

How to use
----------

[demo](http://mifjs.net/misc/zoomer/)

*Example 1:*

html

	#html
	<img src="gomer-small.jpg" id="homer" big="gomer.jpg"/>
js

	#js
	new Zoomer('homer');
	
**big** attribute - big image src.


*Example 2:*

html

	#html
	<img src="girl-thumb.jpg" id="girl"/>
	
js

	#js
	new Zoomer('girl', {
		big: 'girl.jpg',
		smooth: 10
	});
	
options:

* **big** - big image src or image element
* **smooth**(integer) - smooth 