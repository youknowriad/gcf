# Free HTML Area

**Type:** string

In some use cases, you want to use fields to add structured data to your CPT but at the same time, you want to allow random HTML to be saved as post content. The Free HTML Area is the field that allows you exactly that: It adds a container block saved to post content containing any HTML where you can use all Gutenberg defined blocks.

### Template usage

```php
<?php echo get_the_content(); ?>
```
