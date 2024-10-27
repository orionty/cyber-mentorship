import React, { useState } from 'react';
import { Box, Heading, Text, Flex, Container, useColorModeValue, Icon, Button, Avatar, IconButton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      title: "Empowering Journey",
      content: "The mentorship program at CyberMentorship has been transformative. I've gained invaluable insights and practical skills that have accelerated my career in cybersecurity.",
      author: "Sarah Lee",
      role: "Cybersecurity Analyst",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
    },
    {
      title: "Inspiring Connections",
      content: "As a mentor, I've found immense satisfaction in guiding the next generation of cybersecurity professionals. The platform fosters meaningful relationships and knowledge exchange.",
      author: "James Smith",
      role: "Senior Security Engineer",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
    },
    {
      title: "Career Catalyst",
      content: "Thanks to the guidance and resources provided by CyberMentorship, I secured my dream job in the cybersecurity field. The personalized mentorship was key to my success.",
      author: "Emily Johnson",
      role: "Cybersecurity Consultant",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
    }
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('teal.700', 'teal.300');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const titleColor = useColorModeValue('teal.500', 'teal.300');
  const authorColor = useColorModeValue('gray.700', 'gray.200');
  const starColor = 'yellow.400'; // Changed this line to use a fixed color

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Box bg={bgColor} py={20} px={8}>
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <Box flex="1" mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }}>
            <MotionHeading
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="bold"
              color={headingColor}
              mb={4}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Don't just take our word for it...
            </MotionHeading>
            <MotionText
              fontSize={{ base: 'lg', md: 'xl' }}
              color={textColor}
              mb={8}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Hear from our mentors and mentees about their transformative experiences with CyberMentorship.
            </MotionText>
            <Flex>
              <IconButton
                onClick={prevTestimonial}
                mr={4}
                size="lg"
                colorScheme="teal"
                variant="outline"
                icon={<FaChevronLeft />}
                aria-label="Previous testimonial"
              />
              <IconButton
                onClick={nextTestimonial}
                size="lg"
                colorScheme="teal"
                icon={<FaChevronRight />}
                aria-label="Next testimonial"
              />
            </Flex>
          </Box>
          <Box flex="1" w="100%">
            <AnimatePresence mode="wait">
              <MotionBox
                key={currentIndex}
                bg={cardBgColor}
                p={8}
                borderRadius="lg"
                boxShadow="xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <MotionFlex mb={6} align="center">
                  <Avatar size="xl" src={testimonials[currentIndex].image} mr={4} />
                  <Box>
                    <Heading as="h3" size="lg" color={titleColor} mb={2}>
                      {testimonials[currentIndex].title}
                    </Heading>
                    <Flex mb={2}>
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Icon key={i} as={FaStar} color={starColor} w={4} h={4} />
                      ))}
                    </Flex>
                  </Box>
                </MotionFlex>
                <MotionText fontSize="lg" color={textColor} mb={6}>
                  "{testimonials[currentIndex].content}"
                </MotionText>
                <MotionFlex align="center">
                  <Text fontWeight="bold" color={authorColor} mr={2}>
                    {testimonials[currentIndex].author}
                  </Text>
                  <Text color={textColor} fontSize="sm">
                    {testimonials[currentIndex].role}
                  </Text>
                </MotionFlex>
              </MotionBox>
            </AnimatePresence>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
